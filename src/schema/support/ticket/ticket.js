import * as yup from 'yup'

export const TicketSchema = ( reqType ) => {
    const isNewRequest = reqType === 'new'
    return yup.object().shape({
        customer            : yup.object().label('Customer').nullable()
                                .when([], {
                                            is  : () => isNewRequest,
                                            then: (schema) => schema.required(),
                                }),
        machine             : yup.object().label('Machine').nullable()
                                .when([], {
                                            is  : () => isNewRequest,
                                            then: (schema) => schema.required(),
                                }),
        issueType           : yup.object().label('Issue Type').nullable()
                                .when([], {
                                    is  : () => isNewRequest,
                                    then: (schema) => schema.required(),
                                }),
        reporter           : yup.object().nullable().label('Reporter'),
        assignee           : yup.object().nullable().label('Assignee'),
        changeType         : yup.object().nullable().label('Change Type'),
        impact             : yup.object().nullable().label('Impact'),
        priority           : yup.object().nullable().label('Priority'),
        status             : yup.object().nullable().label('Status'),
        changeReason       : yup.object().nullable().label('Change Reason'),
        investigationReason: yup.object().nullable().label('Investigation Reason'),
        files              : yup.mixed().label("Files").nullable(),
        hlc                : yup.string().label('HLC').trim().max(500).nullable(),
        plc                : yup.string().label('PLC').trim().max(500).nullable(),
        description        : yup.string().label('Description').trim().max(10000).nullable(),
        summary            : yup.string().label('Summary').trim().max(200).nullable(),
        implementationPlan : yup.string().label('Implementation Plan').trim().max(10000).nullable(),
        backoutPlan        : yup.string().label('Backout Plan').trim().max(10000).nullable(),
        testPlan           : yup.string().label('Test Plan').trim().max(10000).nullable(),
        groups             : yup.string().label('Root Cause').trim().max(5000).nullable(),
        rootCause          : yup.string().label('Internal Note').trim().max(10000).nullable(),
        workaround         : yup.string().label('Work Around').trim().max(10000).nullable(),

        plannedStartDate   : yup.date().label("Planned Start Date").nullable()
                                .test('plannedStartDate', 'Start Date must be earlier than End Date', ( value, context ) => {
                                const { plannedEndDate } = context.parent;
                                return value && (!plannedEndDate || value < plannedEndDate);
                                }),

        plannedEndDate     : yup.date().label("Planned End Date").nullable()
                                .test('plannedEndDate', 'End Date must be later than Start Date', ( value, context ) => {
                                const { plannedStartDate } = context.parent;
                                return value && (!plannedStartDate || value > plannedStartDate);
                                }),

        shareWith           : yup.boolean().label("Share With"),
        isActive            : yup.boolean().label("Active"),
        isArchived          : yup.boolean().label("Archived"),
    })
}

export const TicketCommentSchema = yup.object().shape({
 comment   : yup.string().required('Comment is required').max(300, 'Comment must not exceed 300 characters'),
 isInternal: yup.boolean()
})