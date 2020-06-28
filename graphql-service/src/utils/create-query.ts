import * as _ from "lodash";

import { IFilterable } from "../models/filterable.interface";

export class CreateQuery {

    public static filterArg(args: IFilterable): any {
        let filterArg: any;

        if (_.isString(filterArg)) {
            try {
                filterArg = JSON.parse(args.filter);
            } catch {
                throw new Error("Invalid filter JSON");
            }
        } else {
            filterArg = args.filter;
        }

        return filterArg;
    }

}