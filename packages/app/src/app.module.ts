import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_SERVICE, SurrealDbModule } from '@koakh/nestjs-surrealdb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SurrealDbModule.forRootAsync(SurrealDbModule, {
      useFactory: async (configService: ConfigService, userService: UserService) => ({
        secret: configService.get('accessTokenJwtSecret'),
        expiresIn: configService.get('accessTokenExpiresIn'),
        userService,
      }),
      // this is required to else we have error
      // Nest can't resolve dependencies of the SurrealDbService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument APP_SERVICE at index [1] is available in the SurrealDbModule context.
      imports: [AppModule, UserModule],
      inject: [ConfigService, UserService]
      // works but opted to useFactory is the one way to inject services like config service
      // useExisting: {
      //   value: {
      //     createModuleConfig: () => {
      //       return {
      //         secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a83f',
      //         expiresIn: '120s',
      //       }
      //     }
      //   },
      // },
      // no need for this module already export's it
      // exports: [SurrealDbService],
    }),
  ],
  controllers: [AppController],
  providers: [
    // another trick is that this AppService is required to else we have the mitic error
    // Nest can't resolve dependencies of the AppController (?, SurrealDbService). Please make sure that the argument AppService at index [0] is available in the AppModule context.
    AppService,
    {
      provide: APP_SERVICE,
      useClass: AppService,
      // useValue: 'VALUE_FROM_APP_SERVICE'
    },
    // opted to use options object to pass userService
    // UserService,
    // {
    //   provide: USER_SERVICE,
    //   useClass: UserService,
    //   // useValue: 'VALUE_FROM_USER_SERVICE'
    // }
  ],
  // at last so kind of clue, this is what will solve the problem of 
  // ERROR [ExceptionHandler] Nest can't resolve dependencies of the SurrealDbService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument APP_SERVICE at index [1] is available in the SurrealDbModule context.
  // now we can import it with `imports: [AppModule]` into SurrealDbModule, and expose it's providers
  // this wat we use it inside it with `@Inject('APP_SERVICE')`
  exports: [
    {
      provide: APP_SERVICE,
      useClass: AppService,
      // always test with a value first
      // useValue: 'VALUE_FROM_APP_SERVICE'
    },
    // opted to use options object to pass userService
    // UserService,
    // {
    //   provide: USER_SERVICE,
    //   useClass: UserService,
    //   // useValue: 'VALUE_FROM_USER_SERVICE'
    // }
  ]
})

export class AppModule { }