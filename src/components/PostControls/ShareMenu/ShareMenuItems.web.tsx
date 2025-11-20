import {memo, useMemo} from 'react'
import {AtUri} from '@atproto/api'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {useNavigation} from '@react-navigation/native'

import {useOpenLink} from '#/lib/hooks/useOpenLink'
import {makeProfileLink} from '#/lib/routes/links'
import {type NavigationProp} from '#/lib/routes/types'
import {shareText, shareUrl} from '#/lib/sharing'
import {toShareUrl, toShareUrlBsky} from '#/lib/strings/url-helpers'
import {logger} from '#/logger'
import {isWeb} from '#/platform/detection'
import {useAgeAssurance} from '#/state/ageAssurance/useAgeAssurance'
import {useProfileShadow} from '#/state/cache/profile-shadow'
import {useShowExternalShareButtons} from '#/state/preferences/external-share-buttons'
import {useSession} from '#/state/session'
import {useBreakpoints} from '#/alf'
import {useDialogControl} from '#/components/Dialog'
import {EmbedDialog} from '#/components/dialogs/Embed'
import {SendViaChatDialog} from '#/components/dms/dialogs/ShareViaChatDialog'
import {ChainLink_Stroke2_Corner0_Rounded as ChainLinkIcon} from '#/components/icons/ChainLink'
import {Clipboard_Stroke2_Corner2_Rounded as ClipboardIcon} from '#/components/icons/Clipboard'
import {CodeBrackets_Stroke2_Corner0_Rounded as CodeBracketsIcon} from '#/components/icons/CodeBrackets'
import {PaperPlane_Stroke2_Corner0_Rounded as Send} from '#/components/icons/PaperPlane'
import {SquareArrowTopRight_Stroke2_Corner0_Rounded as ExternalIcon} from '#/components/icons/SquareArrowTopRight'
import * as Menu from '#/components/Menu'
import {useDevMode} from '#/storage/hooks/dev-mode'
import {type ShareMenuItemsProps} from './ShareMenuItems.types'

let ShareMenuItems = ({
  post,
  record,
  timestamp,
  onShare: onShareProp,
}: ShareMenuItemsProps): React.ReactNode => {
  const {hasSession} = useSession()
  const {gtMobile} = useBreakpoints()
  const {_} = useLingui()
  const navigation = useNavigation<NavigationProp>()
  const embedPostControl = useDialogControl()
  const sendViaChatControl = useDialogControl()
  const [devModeEnabled] = useDevMode()
  const {isAgeRestricted} = useAgeAssurance()
  const openLink = useOpenLink()

  const postUri = post.uri
  const postCid = post.cid
  const postAuthor = useProfileShadow(post.author)

  const href = useMemo(() => {
    const urip = new AtUri(postUri)
    return makeProfileLink(postAuthor, 'post', urip.rkey)
  }, [postUri, postAuthor])

  const hideInPWI = useMemo(() => {
    return !!postAuthor.labels?.find(
      label => label.val === '!no-unauthenticated',
    )
  }, [postAuthor])

  const onCopyLink = () => {
    logger.metric('share:press:copyLink', {}, {statsig: true})
    const url = toShareUrl(href)
    shareUrl(url)
    onShareProp()
  }

  const onCopyLinkBsky = () => {
    logger.metric('share:press:copyLink', {}, {statsig: true})
    const url = toShareUrlBsky(href)
    shareUrl(url)
    onShareProp()
  }

  const onSelectChatToShareTo = (conversation: string) => {
    logger.metric('share:press:dmSelected', {}, {statsig: true})
    navigation.navigate('MessagesConversation', {
      conversation,
      embed: postUri,
    })
  }

  const canEmbed = isWeb && gtMobile && !hideInPWI

  const onShareATURI = () => {
    shareText(postUri)
  }

  const onShareAuthorDID = () => {
    shareText(postAuthor.did)
  }

  const showExternalShareButtons = useShowExternalShareButtons()
  const isBridgedPost =
    !!post.record.bridgyOriginalUrl || !!post.record.fediverseId
  const originalPostUrl = (post.record.bridgyOriginalUrl ||
    post.record.fediverseId) as string | undefined

  const onOpenOriginalPost = () => {
    originalPostUrl && openLink(originalPostUrl, true)
  }

  const onOpenPostInPdsls = () => {
    openLink(`https://pdsls.dev/${post.uri}`, true)
  }

  const copyLinkItem = (
    <Menu.Group>
      <Menu.Item
        testID="postDropdownShareBtn"
        label={_(msg`Copy link to post`)}
        onPress={onCopyLink}>
        <Menu.ItemText>
          <Trans>Copy link to skeet</Trans>
        </Menu.ItemText>
        <Menu.ItemIcon icon={ChainLinkIcon} position="right" />
      </Menu.Item>
      <Menu.Item
        testID="postDropdownShareBtn"
        label={_(msg`Copy link to post`)}
        onPress={onCopyLinkBsky}>
        <Menu.ItemText>
          <Trans>Copy via bsky.app</Trans>
        </Menu.ItemText>
        <Menu.ItemIcon icon={ChainLinkIcon} position="right" />
      </Menu.Item>
    </Menu.Group>
  )

  return (
    <>
      <Menu.Outer>
        {copyLinkItem}

        {showExternalShareButtons && isBridgedPost && (
          <Menu.Item
            testID="postDropdownOpenOriginalPost"
            label={_(msg`Open original post`)}
            onPress={onOpenOriginalPost}>
            <Menu.ItemText>
              <Trans>Open original skeet</Trans>
            </Menu.ItemText>
            <Menu.ItemIcon icon={ExternalIcon} position="right" />
          </Menu.Item>
        )}

        {showExternalShareButtons && (
          <Menu.Item
            testID="postDropdownOpenInPdsls"
            label={_(msg`Open post in PDSls`)}
            onPress={onOpenPostInPdsls}>
            <Menu.ItemText>
              <Trans>Open skeet in PDSls</Trans>
            </Menu.ItemText>
            <Menu.ItemIcon icon={ExternalIcon} position="right" />
          </Menu.Item>
        )}

        {hasSession && !isAgeRestricted && (
          <Menu.Item
            testID="postDropdownSendViaDMBtn"
            label={_(msg`Send via direct message`)}
            onPress={() => {
              logger.metric('share:press:openDmSearch', {}, {statsig: true})
              sendViaChatControl.open()
            }}>
            <Menu.ItemText>
              <Trans>Send via direct message</Trans>
            </Menu.ItemText>
            <Menu.ItemIcon icon={Send} position="right" />
          </Menu.Item>
        )}

        {canEmbed && (
          <Menu.Item
            testID="postDropdownEmbedBtn"
            label={_(msg`Embed post`)}
            onPress={() => {
              logger.metric('share:press:embed', {}, {statsig: true})
              embedPostControl.open()
            }}>
            <Menu.ItemText>{_(msg`Embed skeet`)}</Menu.ItemText>
            <Menu.ItemIcon icon={CodeBracketsIcon} position="right" />
          </Menu.Item>
        )}

        {false && hideInPWI && (
          <>
            {hasSession && <Menu.Divider />}
            {copyLinkItem}
            <Menu.LabelText style={{maxWidth: 220}}>
              <Trans>Note: This skeet is only visible to logged-in users.</Trans>
            </Menu.LabelText>
          </>
        )}

        {devModeEnabled && (
          <>
            <Menu.Divider />
            <Menu.Item
              testID="postAtUriShareBtn"
              label={_(msg`Copy post at:// URI`)}
              onPress={onShareATURI}>
              <Menu.ItemText>
                <Trans>Copy skeet at:// URI</Trans>
              </Menu.ItemText>
              <Menu.ItemIcon icon={ClipboardIcon} position="right" />
            </Menu.Item>
            <Menu.Item
              testID="postAuthorDIDShareBtn"
              label={_(msg`Copy author DID`)}
              onPress={onShareAuthorDID}>
              <Menu.ItemText>
                <Trans>Copy author DID</Trans>
              </Menu.ItemText>
              <Menu.ItemIcon icon={ClipboardIcon} position="right" />
            </Menu.Item>
          </>
        )}
      </Menu.Outer>

      {canEmbed && (
        <EmbedDialog
          control={embedPostControl}
          postCid={postCid}
          postUri={postUri}
          record={record}
          postAuthor={postAuthor}
          timestamp={timestamp}
        />
      )}

      <SendViaChatDialog
        control={sendViaChatControl}
        onSelectChat={onSelectChatToShareTo}
      />
    </>
  )
}
ShareMenuItems = memo(ShareMenuItems)
export {ShareMenuItems}
