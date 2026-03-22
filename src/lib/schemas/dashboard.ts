import { z } from "zod";

export const dashboardSchema = z.object({
	id: z.number(),
	header: z.string(),
	type: z.string(),
	status: z.string(),
	target: z.string(),
	limit: z.string(),
	reviewer: z.string(),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;

/** Alias for dashboardSchema (used by dashboard components) */
export const schema = dashboardSchema;

/** Alias for DashboardSchema (used by dashboard components) */
export type Schema = DashboardSchema;
