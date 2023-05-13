import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto {
  @ApiProperty({
    example: 'Internal server error.',
    description: 'message in service response',
  })
  public message: string;

  @ApiProperty({
    example: 500,
    description: 'status code in service response',
  })
  public statusCode: number;
}
