import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthenticateDto, ChangeDto, ConnectDto, CreateDto, LetDto, ModifyDto, QueryDto, SigninDto, SignupDto, SyncDto, UpdateDto, UseDto } from './dto';
import { SignUpInResponseDto } from './dto/signup-in-response.dto';
import { SurrealDbResponseDto } from './dto/surrealdb-response.dto';
import { SurrealDbService } from './surrealdb.service';

@Controller('surrealdb')
export class SurrealDbController {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }

  @Post('/connect')
  connect(@Body() { url }: ConnectDto): any {
    return this.surrealDbService.connect(url);
  }

  @Post('/close')
  close(): any {
    return this.surrealDbService.close();
  }

  @Post('/use')
  use(@Body() { ns, db }: UseDto): any {
    return this.surrealDbService.use(ns, db);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<SignUpInResponseDto> {
    let mode = {};
    // https://surrealdb.com/docs/sdk/javascript/methods/signup#example-usage
    if (signupDto.access) {
      // with Record Access: if passed 
      mode = { access: 'user' };
    }
    // With Scopes
    else {
      mode = { scope: 'user' };
    }

    return this.surrealDbService.signup({
      namespace: signupDto.namespace,
      database: signupDto.database,
      scope: signupDto.scope,
      ...mode,
    });
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto): Promise<SignUpInResponseDto> {
    return this.surrealDbService.signin({
      namespace: signinDto.namespace,
      database: signinDto.database,
      scope: signinDto.scope,
      username: signinDto.username,
      password: signinDto.password,
    });
  }

  @Post('/invalidate')
  invalidate(): any {
    return this.surrealDbService.invalidate();
  }

  @Post('/authenticate')
  authenticate(@Body() { token }: AuthenticateDto): any {
    return this.surrealDbService.authenticate(token);
  }

  @Post('/let')
  let(@Body() { key, val }: LetDto): Promise<string> {
    return this.surrealDbService.let(key, val);
  }

  @Post('/query')
  async query(@Body() { sql, vars }: QueryDto): Promise<SurrealDbResponseDto> {
    return this.surrealDbService.query(sql, vars);
  }

  @Get('/select/:thing')
  select(@Param('thing') thing: string): any {
    return this.surrealDbService.select(thing);
  }

  @Post('/create/:thing')
  create(@Param('thing') thing: string, @Body() createDto: CreateDto): any {
    return this.surrealDbService.create(thing, createDto);
  }

  @Put('/update/:thing')
  update(@Param('thing') thing: string, @Body() updateDto: UpdateDto): any {
    return this.surrealDbService.update(thing, updateDto);
  }

  @Patch('/change/:thing')
  change(@Param('thing') thing: string, @Body() modifyDto: ModifyDto): any {
    return this.surrealDbService.change(thing, modifyDto);
  }

  @Patch('/modify/:thing')
  modify(@Param('thing') thing: string, @Body() changeDto: ChangeDto): any {
    return this.surrealDbService.change(thing, changeDto);
  }

  @Delete('/delete/:thing')
  delete(@Param('thing') thing: string): any {
    return this.surrealDbService.delete(thing);
  }

  @Post('/sync')
  sync(@Body() { query, vars }: SyncDto): any {
    return this.surrealDbService.sync(query, vars);
  }

  @Post('/ping')
  ping(): any {
    return this.surrealDbService.ping();
  }

  @Post('/info')
  info(): any {
    return this.surrealDbService.info();
  }

  @Post('/live')
  live(@Param('table') table: string): any {
    return this.surrealDbService.live(table);
  }

  @Post('/kill')
  kill(@Param('query') query: string): any {
    return this.surrealDbService.kill(query);
  }
}
