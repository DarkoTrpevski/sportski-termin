import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDateDto } from './dto/edit-event-date.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async createEvents(userId: number, dto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async getEvents(userId: number) {
    return this.prismaService.event.findMany({
      where: {
        userId,
      },
    });
  }

  async getEventsById(userId: number, eventId: number) {
    return this.prismaService.event.findFirst({
      where: {
        userId,
        id: eventId,
      },
    });
  }

  async editEventsById(userId: number, eventId: number, dto: EditEventDateDto) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    // check if user owns the event
    if (!event || event.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteEventsById(userId: number, eventId: number) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    // check if user owns the event
    if (!event || event.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prismaService.event.delete({
      where: {
        id: eventId,
      },
    });
  }
}
