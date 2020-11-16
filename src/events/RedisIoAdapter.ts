import { IoAdapter } from '@nestjs/platform-socket.io';
import redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    const redisAdapter = redisIoAdapter.createAdapter("localhost:6379", { });
    server.adapter(redisAdapter);
    return server;
  }
}