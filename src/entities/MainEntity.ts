import { validate, ValidationError } from "class-validator";
import { BaseEntity, SaveOptions } from "typeorm";

//@ts-ignore
export default class MainEntity extends BaseEntity {

  public errors?: ValidationError[];
  protected applyValidations = true;

  //do validations before save, if validations don't pass set object.errors
  //otherwise save
  public async save(options?: SaveOptions): Promise<any> {
    this.errors = undefined;

    if (!this.applyValidations)
      await super.save(options)
    else {
      const errors = await validate(this);
      if (errors.length > 0) {
        this.errors = errors.map(e => {
          //filter possible sensitive fields, so this can be sent to the user
          const { property, constraints, value } = e
          return { property, constraints, value };
        });
      }
      else
        await super.save(options)
    }

    return this;
  }
}
