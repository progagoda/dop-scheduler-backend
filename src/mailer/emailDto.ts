import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'nodemailer/lib/mailer';

export class EmailDto {
  @ApiProperty({
    example: { name: 'test', address: 'test@mail.ru' },
    description: 'Email address from send',
  })
  from?: Address;

  @ApiProperty({
    example: [
      { name: 'test', address: 'test@mail.ru' },
      { name: 'test2', address: 'test2@mail.ru' },
    ],
    description: 'Clients which need send emails',
  })
  recipients: Address[];

  @ApiProperty({
    example: 'Some title',
    description: 'The title of current mail',
  })
  subject: string;

  @ApiProperty({
    example: '<p>Hi. You have new lesson tomorrow</p>',
    description: 'Some html information about subject',
  })
  html: string;

  @ApiProperty({
    example: 'Hi. You have new lesson tomorrow',
    description: 'Some text information about subject',
  })
  text?: string;

  @ApiProperty({
    example: 'Hi. You have new lesson tomorrow',
    description: 'Some text information about subject',
  })
  placeHolderReplacements?: Record<string, string>;
}
