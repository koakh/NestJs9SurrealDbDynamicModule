import { DataloaderModule } from '@koakh/nestjs-dataloader';
import { SurrealDbModule } from '@koakh/nestjs-surrealdb';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RecipesModule } from './recipes/recipes.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SurrealDbModule.forRootAsync(SurrealDbModule, {
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('SURREALDB_URL'),
        namespace: configService.get('SURREALDB_NAMESPACE'),
        database: configService.get('SURREALDB_DATABASE'),
        username: configService.get('SURREALDB_USERNAME'),
        password: configService.get('SURREALDB_PASSWORD'),
      }),
      imports: [AppModule],
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), configService.get<string>('GRAPHQL_AUTO_SCHEMA_FILE')),
        installSubscriptionHandlers: true,
        formatError: (err) => {
          if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
            return new Error(err.message);
          }
          return err;
        },
      }),
    }),
    DataloaderModule,
    RecipesModule,
    RestaurantsModule,
  ],
})
export class AppModule { }
