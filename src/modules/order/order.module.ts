import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import { OrderController } from './order.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [BookingService],
})
export class OrderModule {}
