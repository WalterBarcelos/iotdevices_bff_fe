import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Device } from './devices.model';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateDeviceInput } from './devices.input';

@Injectable()
export class DevicesService {
  constructor(private httpService: HttpService) {
    console.log('Creates DeviceService');
  }

  async findAll(token: string): Promise<Device[]> {
    const response = this.httpService.get<Device[]>('http://springboot:8081/api/devices', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const devices: AxiosResponse<Device[]> = await lastValueFrom(response);
    return devices.data;
  }

  async findOne(id: string, token: string): Promise<Device> {
    const response = this.httpService.get<Device>(`http://springboot:8081/api/devices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const device: AxiosResponse<Device> = await lastValueFrom(response);
    return device.data;
  }

  async create(device: CreateDeviceInput, token: string): Promise<Device> {
    const response = this.httpService.post<Device>('http://springboot:8081/api/devices', device, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createdDevice: AxiosResponse<Device> = await lastValueFrom(response);
    return createdDevice.data;
  }

  async remove(id: string, token: string): Promise<void> {
    const response = this.httpService.delete(`http://springboot:8081/api/devices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await lastValueFrom(response);
  }
}
