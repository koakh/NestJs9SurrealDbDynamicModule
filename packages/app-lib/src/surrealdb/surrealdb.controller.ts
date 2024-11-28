import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { Uuid } from 'surrealdb';
import { AuthenticateDto, ConnectDto, CreateDto, SigninDto, SignupDto, UpdateDto, UseDto } from './dto';
import { SignUpInResponseDto } from './dto/signup-in-response.dto';
import { SurrealDbService } from './surrealdb.service';

@Controller('surrealdb')
export class SurrealDbController {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }

  @Post('/connect')
  async connect(@Body() { url }: ConnectDto) {
    return await this.surrealDbService.connect(url);
  }

  @Post('/close')
  async close() {
    return await this.surrealDbService.close();
  }

  @Post('/use')
  async use(@Body() { ns, db }: UseDto) {
    return await this.surrealDbService.use(ns, db);
  }

  @Post('/signup')
  // https://surrealdb.com/docs/sdk/javascript/methods/signup#signup
  async signup(@Body() signupDto: SignupDto): Promise<SignUpInResponseDto> {
    // access supported from SurrealDB 2.x onwards
    // https://surrealdb.com/docs/sdk/javascript/core/handling-authentication
    // https://surrealdb.com/docs/sdk/javascript/methods/signup#example-usage
    let mode = signupDto.access ? { access: signupDto.access } : { access: signupDto.scope };
    const payload = { ...signupDto, ...mode, }
    // Logger.log(`payload: [${JSON.stringify(payload, undefined, 2)}]`, SurrealDbController.name);
    return await this.surrealDbService.signup(payload);
  }

  @Post('/signin')
  // https://surrealdb.com/docs/sdk/javascript/methods/signin#example-usage    
  async signin(@Body() signinDto: SigninDto): Promise<SignUpInResponseDto> {
    let mode = signinDto.access ? { access: signinDto.access } : { access: signinDto.scope };
    const payload = { ...signinDto, ...mode, }
    return await this.surrealDbService.signin(payload);
  }

  @Post('/invalidate')
  async invalidate() {
    return await this.surrealDbService.invalidate();
  }

  @Post('/authenticate')
  async authenticate(@Body() { token }: AuthenticateDto) {
    return await this.surrealDbService.authenticate(token);
  }

  @Post('/let')
  async let(@Body() { key, val }) {
    return await this.surrealDbService.let(key, val);
  }

  @Post('/query')
  async query(@Body() { sql, vars }) {
    return await this.surrealDbService.query(sql, vars);
  }

  @Get('/select/:thing')
  async select(@Param('thing') thing: string) {
    return await this.surrealDbService.select(thing);
  }

  @Post('/create/:thing')
  async create(@Param('thing') thing: string, @Body() createDto: CreateDto) {
    return await this.surrealDbService.create(thing, createDto);
  }

  @Put('/update/:thing')
  async update(@Param('thing') thing: string, @Body() updateDto: UpdateDto) {
    return await this.surrealDbService.update(thing, updateDto);
  }

  @Delete('/delete/:thing')
  async delete(@Param('thing') thing: string) {
    return await this.surrealDbService.delete(thing);
  }

  @Post('/ping')
  async ping() {
    return await this.surrealDbService.ping();
  }

  @Post('/info')
  async info() {
    return await this.surrealDbService.info();
  }

  @Post('/live')
  async live(@Param('table') table: string) {
    return await this.surrealDbService.live(table);
  }

  @Post('/kill')
  async kill(@Param('query') queryUuid: Uuid | readonly Uuid[]) {
    return await this.surrealDbService.kill(queryUuid);
  }
}
