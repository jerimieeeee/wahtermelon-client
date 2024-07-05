// import { Injectable } from '@angular/core';
// import Echo from 'laravel-echo';
// import { CookieService } from 'ngx-cookie-service';
// import Pusher from 'pusher-js';

// declare global {
//   interface Window {
//     Pusher: any;
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LaravelEchoService {
//   private echo: Echo;
//   private cookie_value: string;

//   constructor(private cookieService: CookieService) {
//     window.Pusher = Pusher;

//     this.cookie_value = this.cookieService.get('access_token');

//     this.echo = new Echo({
//       broadcaster: 'pusher',
//       key: 'app-key',
//       wsHost: '127.0.0.1',
//       wsPort: 6001,
//       wssPort: 6001,
//       cluster: 'mt1',
//       forceTLS: false,
//       encrypted: true,
//       disableStats: true,
//       enabledTransports: ['ws', 'wss'],
//       authEndpoint: 'http://wahtermelon.test/broadcasting/auth',  // Ensure this matches your Laravel setup
//       auth: {
//         headers: {
//           Authorization: `Bearer ${this.cookie_value}`  // Use the cookie value here
//         }
//       }
//     });
//   }

//   public channel(channelName: string): any {
//     return this.echo.channel(channelName);
//   }

//   public listen(channelName: string, eventName: string, callback: any): void {
//     this.echo.channel(channelName).listen(eventName, callback);
//   }

//   public listenForWhisper(channelName: string, eventName: string, callback: any): void {
//     this.echo.channel(channelName).listenForWhisper(eventName, callback);
//   }

//   public disconnect(): void {
//     if (this.echo) {
//       this.echo.disconnect();
//     }
//   }

//   public reconnect(): void {
//     this.disconnect();
//     this.initializeEcho();
//   }

//   listenToUserChannel(userId: string) {
//     //console.log(this.cookie_value);
//     console.log(userId);
//     this.echo.private(`App.Models.User.${userId}`)
//       .listen('UserUpdated', (event: any) => {
//         console.log('User updated event received:', event);
//       });
//   }

//   listenToTestChannel() {
//     //console.log(this.cookie_value);
//     this.echo.channel('websocket-test-channel')
//     .listen('.websocket.test', (event: any) => {
//       console.log('User updated event received:', event);
//     });
//   }
// }

// import { Injectable, OnDestroy } from '@angular/core';
// import Echo from 'laravel-echo';
// import { CookieService } from 'ngx-cookie-service';
// import Pusher from 'pusher-js';

// declare global {
//   interface Window {
//     Pusher: any;
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LaravelEchoService {
//   private echo: Echo;
//   private cookie_value: string;

//   constructor(private cookieService: CookieService) {
//     window.Pusher = Pusher;
//     this.cookie_value = this.cookieService.get('access_token');
//     this.initializeEcho();
//   }

//   private initializeEcho(): void {
//     this.echo = new Echo({
//       broadcaster: 'pusher',
//       key: 'app-key',
//       wsHost: '127.0.0.1',
//       wsPort: 6001,
//       wssPort: 6001,
//       cluster: 'mt1',
//       forceTLS: false,
//       encrypted: true,
//       disableStats: true,
//       enabledTransports: ['ws', 'wss'],
//       authEndpoint: 'http://wahtermelon.test/broadcasting/auth',
//       auth: {
//         headers: {
//           Authorization: `Bearer ${this.cookie_value}`
//         }
//       }
//     });
//   }

//   public channel(channelName: string): any {
//     return this.echo.channel(channelName);
//   }

//   public listen(channelName: string, eventName: string, callback: any): void {
//     this.echo.channel(channelName).listen(eventName, callback);
//   }

//   public listenForWhisper(channelName: string, eventName: string, callback: any): void {
//     this.echo.channel(channelName).listenForWhisper(eventName, callback);
//   }

//   listenToUserChannel(userId: string) {
//     console.log(userId);
//     this.echo.private(`App.Models.User.${userId}`)
//       .listen('UserUpdated', (event: any) => {
//         console.log('User updated event received:', event);
//       });
//   }

//   listenToTestChannel() {
//     this.echo.channel('websocket-test-channel')
//     .listen('.websocket.test', (event: any) => {
//       console.log('User updated event received:', event);
//     });
//   }

//   // Method to close the WebSocket connection
//   public disconnect(): void {
//     if (this.echo) {
//       this.echo.disconnect();
//     }
//   }

//   // Method to reconnect the WebSocket connection
//   public reconnect(): void {
//     if(this.isConnected) {
//       this.disconnect();
//     }
//     this.initializeEcho();
//   }

//   public isConnected(): boolean {
//     if (this.echo && this.echo.connector) {
//       const connectionState = this.echo.connector.pusher.connection.state;
//       console.log(`WebSocket connection state: ${connectionState}`);
//       return connectionState === 'connected';
//     }
//     return false;
//   }

  // ngOnDestroy(): void {
  //   this.disconnect();
  // }
//}

import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LaravelEchoService {
  private pusher;
  private echo;
  private cookie_value: string;

  constructor(private cookieService: CookieService) {
    this.cookie_value = this.cookieService.get('access_token');
    this.pusher = Pusher;

    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'app-key',
      cluster: 'mt1',
      wsHost: 'sockets.wah.ph',
      wsPort: 443, // Update if different from 6001
      wssPort: 443, // Update if different from 6001
      forceTLS: true, // Set to true if using HTTPS
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: 'http://training-api/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${this.cookie_value}`
        }
      }
    });
  }

  subscribeToChannel(broadcasting: string, channel: string, facilityCode: string, event: string, callback: (data: any) => void) {
    // this.echo.private(`App.Models.User.${facilityCode}`)
    //   .listen(event, (data: any) => {
    //     callback(data);
    //   });
    this.echo[broadcasting](channel+'.'+facilityCode)
      .listen('.'+event, (data: any) => {
        callback(data);
      });
  }

  listenToUserChannel(userId: string) {
    console.log(userId);
    this.echo.private(`App.Models.User.${userId}`)
      .listen('UserUpdated', (event: any) => {
        console.log('User updated event received:', event);
      });
  }

  listenToTestChannel(facilityCode: string) {
    this.echo.channel('todays-patient'+facilityCode)
    .listen('.todays.patient', (event: any) => {
      console.log('User updated event received:', event);
    });
  }

}
