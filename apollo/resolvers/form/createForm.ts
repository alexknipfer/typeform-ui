import { GQLContext } from '@/apollo/interfaces';
import { ensureUserOwnedWorkspace } from '@/db/workspace/queryHelpers';
import { Form } from '@/models/form';

interface Args {
  workspaceId: string;
}

export const createForm = async (
  _: Record<string, never>,
  { workspaceId }: Args,
  { db, session }: GQLContext,
) => {
  const workspace = await ensureUserOwnedWorkspace({
    db,
    workspaceId,
    userId: session.user.id,
  });

  workspace.createForm(new Form());
  await db.workspaceRepo.commit(workspace);

  return workspace.snapshot();
};
