import * as sdk from 'vdesk'

export function sortTemplatesAliases<
  E extends sdk.components['schemas']['Template']['aliases'],
>(aliases: E) {
  aliases?.sort()
}
