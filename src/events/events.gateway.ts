import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GatewayMetadata } from '@nestjs/websockets';
import { Logger, WebSocketAdapter } from '@nestjs/common';
import { setInterval } from 'timers';
import * as moment from "moment";
import { Socket } from 'net';

@WebSocketGateway(8090)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  public afterInit(server: Server) {
    console.log('   Socket is Running on \n\t8090 port');
  }

  public handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  public handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(`Faker@kline`)
  onEvent(
    client, data
  ): WsResponse<any> {
    const { count } = data
    const bar = { "time": moment().add(count || 0, 'days').format('YYYY-MM-DD'), "value": 108 }
    return { event: "Faker@kline", data: bar }
  }

}
