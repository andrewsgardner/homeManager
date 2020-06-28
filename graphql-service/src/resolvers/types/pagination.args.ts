import { Field, Int, ArgsType } from "type-graphql";
import { Min, Max } from "class-validator";

@ArgsType()
export class PaginationArgs {

    @Field((type) => Int, { nullable: true })
    @Min(0)
    public offset?: number = 0;

    @Field((type) => Int, { nullable: true })
    @Min(1)
    @Max(100)
    public limit?: number = 25;

}