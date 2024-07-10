import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { Device } from './devices.model';
import { CreateDeviceInput } from './devices.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private devicesService: DevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Device])
  async devices(@Context() context) {
    console.log('DevicesResolver: devices called', { context });
    const token = context.req.headers.authorization.split(' ')[1];
    return this.devicesService.findAll(token);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Device)
  async device(@Args('id') id: string, @Context() context) {
    console.log('DevicesResolver: device called', { id, context });
    const token = context.req.headers.authorization.split(' ')[1];
    return this.devicesService.findOne(id, token);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Device)
  async createDevice(@Args('input') input: CreateDeviceInput, @Context() context) {
    console.log('DevicesResolver: createDevice called', { input, context });
    const token = context.req.headers.authorization.split(' ')[1];
    return this.devicesService.create(input, token);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeDevice(@Args('id') id: string, @Context() context) {
    console.log('DevicesResolver: removeDevice called', { id, context });
    const token = context.req.headers.authorization.split(' ')[1];
    await this.devicesService.remove(id, token);
    return true;
  }
}
