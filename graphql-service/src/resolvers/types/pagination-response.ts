import { ClassType, ObjectType, Field, Int } from "type-graphql";

export function PaginationResponse<TItem>(TItemClass: ClassType<TItem>) {

    @ObjectType({ isAbstract: true })
    abstract class PaginationResponseClass {
        @Field((type) => [TItemClass])
        public items: TItem[];

        @Field((type) => Int)
        public totalCount: number;
    }

    return PaginationResponseClass;

}