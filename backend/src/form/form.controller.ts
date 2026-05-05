import { Body, Controller, Get, Post, Query, Put, Delete, Param } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/createform.dto';

@Controller('form')
export class FormController {
    constructor(
        private readonly formService: FormService
    ) {}

    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search: string = ''
    ) {
        return this.formService.getAll(page, limit, search);
    }

    @Post()
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto);
    }

    @Post('create')
    createWithPath(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateFormDto: any) {
        return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.formService.remove(id);
    }
}


