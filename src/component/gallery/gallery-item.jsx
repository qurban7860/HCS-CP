import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME } from 'hook'
import { useTheme, Card, Typography, Stack, CardMedia, ButtonGroup, Button } from '@mui/material'
import { SkeletonGallery, ConfirmDialog, Image } from 'component'
import { fileThumb } from 'component/upload'
import { bgBlur } from 'theme/style'

GalleryItem.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string,
        thumbnail: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        fileType: PropTypes.string,
        extension: PropTypes.string,
        postAt: PropTypes.instanceOf(Date)
    }),
    isLoading: PropTypes.bool,
    onOpenLightbox: PropTypes.func,
    onOpenFile: PropTypes.func,
    onDownloadFile: PropTypes.func,
    onDeleteFile: PropTypes.func,
    toolbar: PropTypes.bool,
    isArchived: PropTypes.bool,
    size: PropTypes.number
}

export default function GalleryItem({ image, isLoading, onOpenLightbox, onOpenFile, onDownloadFile, onDeleteFile, toolbar, isArchived, size = 150 }) {
    const [deleteConfirm, seDeleteConfirm] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    const theme = useTheme();
    const { src, extension, name, fileType } = image;

    return (
        <Fragment>
            {!isLoading ? (
                <Card
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover .button-group': { opacity: 1 },
                        width: '100%',
                        height: size
                    }}
                >

                    {fileType?.startsWith('image') ? (
                        <Image alt="gallery" sx={{ height: '100%' }} ratio="1/1" src={src} onClick={onOpenLightbox} />
                    ) : (
                        <CardMedia sx={{ height: '90%', width: '100%', backgroundSize: '40%', backgroundPosition: 'center 35%' }} image={fileThumb(extension?.toLowerCase())} onClick={() => fileType?.startsWith('application/pdf') && onOpenFile ? onOpenFile() : null} />
                    )}

                    {toolbar &&
                        <ButtonGroup
                            // className="button-group"
                            variant="contained"
                            aria-label="outlined primary button group"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                opacity: isHovered ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out',
                                width: '100%'
                            }}>
                            {(onDownloadFile || onDeleteFile) && <Button sx={{ width: onDeleteFile && !isArchived ? '33%' : '50%' }} disabled={!(fileType?.startsWith('image') || fileType?.startsWith('video') || fileType?.startsWith('application/pdf'))} onClick={(fileType?.startsWith('image') || fileType?.startsWith('video')) ? onOpenLightbox : onOpenFile}><Icon icon={ICON_NAME.PREVIEW} sx={{ width: 20, height: 20 }} /></Button>}
                            {onDownloadFile && <Button sx={{ width: onDeleteFile && !isArchived ? '33%' : '50%' }}><Icon icon={ICON_NAME.DOWNLOAD} onClick={onDownloadFile} sx={{ width: 20, height: 20 }} /></Button>}
                            {onDeleteFile && !isArchived && <Button sx={{ width: '34%' }} color='error' onClick={() => seDeleteConfirm(true)}><Icon icon={ICON_NAME.TRASH} />
                            </Button>}
                        </ButtonGroup>
                    }

                    <Stack
                        padding={1}
                        sx={{
                            ...bgBlur({ color: theme.palette.grey[900] }),
                            width: 1,
                            left: 0,
                            bottom: 0,
                            position: 'absolute',
                            color: 'common.white',
                            textAlign: 'center'
                        }}>
                        <Typography variant="body2">
                            {name?.length > 14 ? name?.substring(0, 14) : name}
                            {name?.length > 14 ? '...' : null}
                        </Typography>
                    </Stack>
                </Card>

            ) : (<SkeletonGallery />)
            }


            <ConfirmDialog
                open={deleteConfirm}
                onClose={() => seDeleteConfirm(false)}
                title={t('delete.label')}
                content={t('delete.description')}
                action={
                    <Button variant='contained' onClick={() => {
                        onDeleteFile()
                        seDeleteConfirm(false)
                    }} color='error'>{t('delete.label')}</Button>
                }
                SubButton={t('cancel.label')} />


        </Fragment>
    );
}





