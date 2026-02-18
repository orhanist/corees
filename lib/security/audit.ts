import { prisma } from "@/lib/prisma";

type AuditParams = {
  actorId: string;
  action: string;
  targetId?: string;
  metadata?: unknown;
  ipAddress?: string;
};

export async function writeAuditLog(params: AuditParams) {
  try {
    await prisma.adminAuditLog.create({
      data: {
        actorId: params.actorId,
        action: params.action,
        targetId: params.targetId,
        metadata: params.metadata ? JSON.stringify(params.metadata) : undefined,
        ipAddress: params.ipAddress,
      },
    });
  } catch {
    // Avoid breaking critical auth flows because of logging failures.
  }
}
