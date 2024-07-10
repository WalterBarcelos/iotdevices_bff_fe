import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DevicesService } from './devices.service';
import { DevicesResolver } from './devices.resolver';

@Module({
  imports: [HttpModule],
  providers: [DevicesService, DevicesResolver],
})
export class DevicesModule {}