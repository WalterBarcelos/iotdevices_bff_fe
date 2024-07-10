// store/deviceSlice.ts

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {gql} from '@apollo/client';
import client from '../apollo/client';
import {AppDispatch, RootState} from './store';

export interface Device {
    id: string;
    name: string;
    mobileNumber: string;
    lastConnection: string;
    latitude: string;
    longitude: string;
}

interface DeviceState {
    devices: Device[];
    loading: boolean;
    error: string | null;
}

const initialState: DeviceState = {
    devices: [],
    loading: false,
    error: null,
};

export const fetchDevices = createAsyncThunk<Device[]>('devices/fetchDevices', async () => {
    const response = await client.query({
        query: gql`
      query GetDevices {
        devices {
          id
          name
          mobileNumber
          lastConnection
          latitude
          longitude
        }
      }
    `,
    });
    return response.data.devices;
});

export const createDevice = createAsyncThunk<Device, Omit<Device, 'id'>, { dispatch: AppDispatch, state: RootState }>(
    'devices/createDevice',
    async (newDevice, {dispatch}) => {
        const response = await client.mutate({
            mutation: gql`
        mutation CreateDevice($input: CreateDeviceInput!) {
          createDevice(input: $input) {
            id
            name
            mobileNumber
            lastConnection
            latitude
            longitude
          }
        }
      `,
            variables: {input: newDevice},
        });
        dispatch(fetchDevices()); // Fetch devices after creation
        return response.data.createDevice;
    }
);

const deviceSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        refreshDevices: (state) => {
            // no-op reducer to trigger fetchDevices
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDevices.fulfilled, (state, action: PayloadAction<Device[]>) => {
                state.devices = action.payload;
                state.loading = false;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch devices';
            })
            .addCase(createDevice.fulfilled, (state, action: PayloadAction<Device>) => {
                state.devices.push(action.payload);
            });
    },
});

export const {refreshDevices} = deviceSlice.actions;

export default deviceSlice.reducer;
