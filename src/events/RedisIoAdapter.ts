import { IoAdapter } from '@nestjs/platform-socket.io';
import  * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    // const redisAdapter = redisIoAdapter.createAdapter({});
    const redisAdapter = redisIoAdapter.createAdapter("//127.0.0.1:6379");
    server.adapter(redisAdapter);
    return server;
  }
}