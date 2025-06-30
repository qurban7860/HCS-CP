import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { useAuthContext } from 'auth/use-auth-context'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { snack, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'schema'
import { Link, Stack, Alert, Box } from '@mui/material'
import { GStyledLoadingButton } from 'theme/style'
import FormProvider, { RHFTextField, RHFPasswordField, RHFCheckbox, RHFReCaptchaV2 } from 'component/hook-form'
import { RADIUS } from 'config'
import { PATH_AUTH } from 'route/path'
import { BUTTON, REGEX, LOCAL_STORAGE_KEY, RESPONSE, KEY, LABEL, FLEX, VARIANT, SNACK, SIZE, COLOR, DEBUG } from 'constant'
import { GLOBAL } from 'config'

const { TYPOGRAPHY } = VARIANT

function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuthContext()
    const { themeMode } = useSettingContext()
    const regEx = new RegExp(REGEX.ERROR_CODE)

    const defaultValues = {
        email: '',
        password: '',
        remember: false,
        recaptchaToken: '',
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    })

    const {
        reset,
        setError,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = methods

    const { remember, email, password, recaptchaToken } = watch()

    // Load saved email & remember
    useEffect(() => {
        const storedHowickUserData = localStorage.getItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA)

        if (storedHowickUserData) {
            const { email, remember } = JSON.parse(storedHowickUserData)
            setValue(KEY.EMAIL, email)
            setValue(KEY.REMEMBER, remember)
        }
    }, [])

    const onSubmit = async data => {
        try {
            if (GLOBAL?.RECAPTCHA_KEY && !data.recaptchaToken) {
                snack('Please complete the reCAPTCHA', { variant: COLOR.ERROR })
                return
            }
            if (remember) {
                const HowickUserData = {
                    email,
                    remember
                }
                localStorage.setItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA, JSON.stringify(HowickUserData))
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA)
            }

            await login(data)

            if (localStorage.getItem(LOCAL_STORAGE_KEY.MFA)) {
                navigate(PATH_AUTH.authenticate)
                localStorage.removeItem(LOCAL_STORAGE_KEY.MFA)
            }

            reset()
        } catch (error) {
            const message = regEx.test(error.MessageCode) ? error.Message : error
            console.error(DEBUG.AUTH_LOGIN_ERROR, message || '')
            snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
            setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
                ...error,
                message
            })
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 1, mb: 1 }}>
                {!!errors.afterSubmit && (
                    <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>
                )}
                <RHFTextField
                    type={KEY.EMAIL}
                    name={KEY.EMAIL}
                    label={t('login.login_email.label')}
                    autoComplete={KEY.USERNAME}
                    aria-label={LABEL.LOGIN_EMAIL}
                    required
                />
                <RHFPasswordField
                    name={KEY.PASSWORD}
                    id={KEY.PASSWORD}
                    label={t('password.label')}
                    autoComplete={KEY.CURRENT_PASSWORD}
                    aria-label={LABEL.LOGIN_PASSWORD}
                />

                <RHFCheckbox name={KEY.REMEMBER} label={t('remember_me.label')} />

                {email.trim() && password.trim().length >= 6 && GLOBAL?.RECAPTCHA_KEY && (
                    <RHFReCaptchaV2
                        name='recaptchaToken'
                    />
                )}
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <GStyledLoadingButton
                    // fullWidth
                    className="portal-button"
                    size={SIZE.SMALL}
                    type={KEY.SUBMIT}
                    mode={themeMode}
                    loading={isSubmitSuccessful || isSubmitting}
                    disabled={GLOBAL?.RECAPTCHA_KEY && (!email.trim() || password.trim().length < 6 || !recaptchaToken)}
                    sx={{
                        ...RADIUS.BORDER,
                        width: '115px',
                    }}
                >
                    {t('login.label').toUpperCase()}
                </GStyledLoadingButton>
            </Box>

            <Stack alignItems={FLEX.FLEX_END} sx={{ my: 2 }}>
                <Link
                    component={RouterLink}
                    to={PATH_AUTH.resetPassword}
                    variant={TYPOGRAPHY.BODY2}
                    color={KEY.INHERIT}
                    underline={KEY.NONE}
                >
                    {BUTTON.FORGOT_PASSWORD}
                </Link>
            </Stack>
        </FormProvider>
    )
}

export default LoginForm
