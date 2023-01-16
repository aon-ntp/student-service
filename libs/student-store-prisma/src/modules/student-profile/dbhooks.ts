import { UniqueEntityID } from "@inh-lib/ddd";
import client from "../../dbclient";

(async function createHooksForAggregateRoots () {

    client.$use(async (params, next) => {
      console.log(`Prisma middleware:`)
        const res =  await next(params)
        if (params.model == 'StudentProfile' && params.action == 'create') {
          // Logic only runs for delete action and Post model
          const uid = new UniqueEntityID(params.args.id)
          console.log(`Fire DomainEvents StudentProfile aggID: ${uid}`)
          // DomainEvents.dispatchEventsForAggregate(uid)
        }
        return res
      })

})();