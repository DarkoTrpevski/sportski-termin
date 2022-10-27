import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDateDto } from './dto/edit-event-date.dto';
import { EventService } from './event.service';

@UseGuards(JwtGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvents(
    @CurrentUser('id') userId: number,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.createEvents(userId, createEventDto);
  }

  @Get()
  getEvents(@CurrentUser('id') userId: number) {
    return this.eventService.getEvents(userId);
  }

  @Get(':id')
  getEventsById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.getEventsById(userId, eventId);
  }

  @Patch(':id')
  editEventsById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
    @Body() editEventDto: EditEventDateDto,
  ) {
    return this.eventService.editEventsById(userId, eventId, editEventDto);
  }

  @Delete(':id')
  deleteEventsById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    return this.eventService.deleteEventsById(userId, eventId);
  }
}
