/**
 * This route is used to keep a Kubernetes VTEX service alive
 * It is mainly used within a cron scheduler for apps with services
 * that aren't called for more than 5 minutes.
 *
 * If you already have crons in your app that run continously every few minutes
 * you won't need this
 *
 * @param ctx
 */
const ping = (ctx: Context) => {
  ctx.set('Cache-Control', 'no-store,no-cache')
  ctx.status = 200
}

export default ping
