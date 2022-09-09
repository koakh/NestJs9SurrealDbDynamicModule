import { SurrealDbModuleOptions, APP_SERVICE, SurrealDbModule, SurrealDbService, SURREALDB_MODULE_OPTIONS } from '@koakh/nestjs-surrealdb';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

// TODO: this will enable @Inject(APP_SERVICE) on 
// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SurrealDbModule.forRootAsync(SurrealDbModule, {
      useFactory: async (configService: ConfigService, userService: UserService) => ({
        url: configService.get('SURREALDB_URL'),
        namespace: configService.get('SURREALDB_NAMESPACE'),
        database: configService.get('SURREALDB_DATABASE'),
        user: configService.get('SURREALDB_USER'),
        pass: configService.get('SURREALDB_PASS'),
        // userServiceAbstract
        userService,
      }),
      // this is required to else we have error
      // Nest can't resolve dependencies of the SurrealDbService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument APP_SERVICE at index [1] is available in the SurrealDbModule context.
      imports: [AppModule, UserModule],
      inject: [ConfigService, UserService],
      // no need for this export, module already export's it
      // exports: [SurrealDbService],
    }),
    DbModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    // another trick is that this AppService is required to else we have the classic error
    // Nest can't resolve dependencies of the AppController (?, SurrealDbService). Please make sure that the argument AppService at index [0] is available in the AppModule context.
    {
      provide: APP_SERVICE,
      useClass: AppService,
    },
  ],
  // at last so kind of clue, this is what will solve the problem of 
  // ERROR [ExceptionHandler] Nest can't resolve dependencies of the SurrealDbService (AUTH_MODULE_OPTIONS, ?). Please make sure that the argument APP_SERVICE at index [1] is available in the SurrealDbModule context.
  // now we can import it with `imports: [AppModule]` into SurrealDbModule, and expose it's providers
  // this wat we use it inside it with `@Inject('APP_SERVICE')`
  exports: [
    {
      provide: APP_SERVICE,
      useClass: AppService,
    },
  ]
})

export class AppModule { }