import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly employeeModel: Model<Customer>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Customer> {
    const employee = new this.employeeModel(createEmployeeDto);
    return employee.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Customer> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndRemove(id);
  }
}
