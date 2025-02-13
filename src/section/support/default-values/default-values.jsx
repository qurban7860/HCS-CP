import { useMemo } from 'react'
import { fDate, parseAddress } from 'util'

/**
 * Generates default values for a issue object.
 * @param {Object} issue - The issue object.
 * @param {Object} customer - The customer object.
 * @returns {Array} - The default values for the  mapped object.
 */
export function useTicketsDefaultValues(issues) {
 return useMemo(() => {
  return issues?.map(issue => ({
   id                  : issue?._id || '',
   key                 : issue?.key || '',
   machineSerialNo     : issue?.fields?.customfield_10069 || '',
   machineModel        : issue?.fields?.customfield_10070?.value || '',
   link                : issue?.self || '',
   projectName         : issue?.fields?.project?.name || '',
   fields              : issue?.fields || {},
   issue               : issue?.fields?.summary || '',
   description         : issue?.fields?.description?.content[0]?.text || '',
   descriptionContents : issue?.fields?.description?.content || [],
   status              : issue?.fields?.status?.name || '',
   statusChangedDate   : fDate(issue?.fields?.statuscategorychangedate) || '',
   assignee            : issue?.assignee || {},
   assigneeStatus      : issue?.fields?.assignee?.active || false,
   assigneeName        : issue?.fields?.assignee?.displayName || '',
   assigneeEmail       : issue?.fields?.assignee?.emailAddress || '',
   assigneeJiraAccount : issue?.fields?.assignee?.self || '',
   assigneeAvatar      : issue?.fields?.assignee?.avatarUrls?.['24x24'] || '',
   assigneeTimeZone    : issue?.fields?.assignee?.timeZone || '',
   plcVersion          : issue?.fields?.customfield_10080 || '',
   hmiVersion          : issue?.fields?.customfield_10081 || '',
   tags                : issue?.fields?.components || [],
   organization        : issue?.fileds?.customfield_10078 || '',
   timespent           : issue?.fields?.timespent || '',
   priority            : issue?.fields?.priority?.name || '',
   progress            : issue?.fields?.progress?.total || '',
   reporter            : issue?.fields?.reporter || {},
   progressPercent     : issue?.fields?.progress?.percent || '',
   reporterName        : issue?.fields?.reporter?.displayName || '',
   reporterId          : issue?.fields?.reporter?.accountId || '',
   reporterAccountType : issue?.fields?.reporter?.accountType || '',
   reporterEmail       : issue?.fields?.reporter?.emailAddress || '',
   reporterJiraAccount : issue?.fields?.reporter?.self || '',
   reporterAvatar      : issue?.fields?.reporter?.avatarUrls?.['24x24'] || '',
   reporterStatus      : issue?.fields?.reporter?.active || '',
   reporterTimeZone    : issue?.fields?.reporter?.timeZone || '',
   approvers           : issue?.fileds?.customfield_10003 || [],
   language            : issue?.fileds?.customfield_10040?.languageCode || '',
   createdAt           : fDate(issue?.fields?.created) || '',
   updatedAt           : fDate(issue?.fields?.updated) || '',
   createdBy           : issue?.fields?.creator?.displayName || '',
   createdById         : issue?.fields?.creator?.accountId || '',
   createdByEmail      : issue?.fields?.creator?.emailAddress || '',
   createdByAvatar     : issue?.fields?.creator?.avatarUrls?.['24x24'] || '',
   createdByJiraAccount: issue?.fields?.creator?.self || '',
   createdByStatus     : issue?.fields?.creator?.active || '',
   createdByTimeZone   : issue?.fields?.creator?.timeZone || '',
   updatedBy           : issue?.updatedBy?.name || '',
   createdIP           : issue?.createdIP || '',
   updatedIP           : issue?.updatedIP || ''
  }))
 }, [issues])
}

/**
 * Generates default values for a issue object.
 * @param {Object} issue - The issue object.
 * @param {Object} customer - The customer object.
 * @returns {Object} - The default values for the issue object.
 */
export function useTicketDefaultValues(issue) {
 return useMemo(() => {
  return {
   id                  : issue?._id || '',
   key                 : issue?.key || '',
   machineSerialNo     : issue?.fields?.customfield_10069 || '',
   machineModel        : issue?.fields?.customfield_10070?.value || '',
   link                : issue?.self || '',
   projectName         : issue?.fields?.project?.name || '',
   fields              : issue?.fields || {},
   issue               : issue?.fields?.summary || '',
   description         : issue?.fields?.description?.content[0]?.content[0]?.text || '',
   descriptionContents : issue?.fields?.description?.content || [],
   status              : issue?.fields?.status?.name || '',
   statusChangedDate   : fDate(issue?.fields?.statuscategorychangedate) || '',
   assignee            : issue?.assignee || {},
   assigneeStatus      : issue?.fields?.assignee?.active || false,
   assigneeName        : issue?.fields?.assignee?.displayName || '',
   assigneeEmail       : issue?.fields?.assignee?.emailAddress || '',
   assigneeJiraAccount : issue?.fields?.assignee?.self || '',
   assigneeAvatar      : issue?.fields?.assignee?.avatarUrls?.['24x24'] || '',
   assigneeTimeZone    : issue?.fields?.assignee?.timeZone || '',
   plcVersion          : issue?.fields?.customfield_10080 || '',
   hmiVersion          : issue?.fields?.customfield_10081 || '',
   tags                : issue?.fields?.components || [],
   organization        : issue?.fileds?.customfield_10078 || '',
   timespent           : issue?.fields?.timespent || '',
   priority            : issue?.fields?.priority?.name || '',
   progress            : issue?.fields?.progress?.total || '',
   reporter            : issue?.fields?.reporter || {},
   progressPercent     : issue?.fields?.progress?.percent || '',
   reporterName        : issue?.fields?.reporter?.displayName || '',
   reporterId          : issue?.fields?.reporter?.accountId || '',
   reporterAccountType : issue?.fields?.reporter?.accountType || '',
   reporterEmail       : issue?.fields?.reporter?.emailAddress || '',
   reporterJiraAccount : issue?.fields?.reporter?.self || '',
   reporterAvatar      : issue?.fields?.reporter?.avatarUrls?.['24x24'] || '',
   reporterStatus      : issue?.fields?.reporter?.active || '',
   reporterTimeZone    : issue?.fields?.reporter?.timeZone || '',
   approvers           : issue?.fileds?.customfield_10003 || [],
   language            : issue?.fileds?.customfield_10040?.languageCode || '',
   createdAt           : fDate(issue?.fields?.created) || '',
   updatedAt           : fDate(issue?.fields?.updated) || '',
   createdBy           : issue?.fields?.creator?.displayName || '',
   createdById         : issue?.fields?.creator?.accountId || '',
   createdByEmail      : issue?.fields?.creator?.emailAddress || '',
   createdByAvatar     : issue?.fields?.creator?.avatarUrls?.['24x24'] || '',
   createdByJiraAccount: issue?.fields?.creator?.self || '',
   createdByStatus     : issue?.fields?.creator?.active || '',
   createdByTimeZone   : issue?.fields?.creator?.timeZone || '',
   updatedBy           : issue?.updatedBy?.name || '',
   createdIP           : issue?.createdIP || '',
   updatedIP           : issue?.updatedIP || ''
  }
 }, [issue])
}

export function useTicketCreateDefaultValues(customer, softwareVersion) {
    return useMemo(() => {
     return {
        customer           : customer && customer || null,
        machine            : null,
        issueType          : null,
        summary            : '',
        description        : '',
        priority           : null,
        status             : null,
        impact             : null,
        files              : [],
        changeType         : null,
        changeReason       : null,
        implementationPlan : '',
        backoutPlan        : '',
        testPlan           : '',
        investigationReason: null,
        rootCause          : '',
        workaround         : '',
        shareWith          : false,
        isActive           : true,
        plannedStartDate   : new Date(),
        plannedEndDate     : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        startTime          : null,
        endTime            : null,
        hlc                : softwareVersion?.hlc || '',
        plc                : softwareVersion?.plc || '',
     }
    }, [customer])
   }

  const configurations = JSON.parse(localStorage.getItem('configurations'))
  const prefix = configurations?.find((config) => config?.name?.toLowerCase() === 'ticket_prefix')?.value || '';
   export function useTicketViewDefaultValues(ticket, customer, softwareVersion) {
      return useMemo(() => {
       return {
          customer           : customer && customer?.name || '',
          ticketNo           : ticket && `${prefix || ''} - ${ticket?.ticketNo || ''}` || '',
          machine            : ticket && `${ticket?.machine?.serialNo || ''} - ${ticket?.machine?.machineModel?.name || ''}` || '',
         //  machineId          : ticket && ticket.machine._id,
          reporter           : ticket && ticket?.reporter && { _id: ticket?.reporter?._id, name: `${ticket.reporter.firstName || ''} ${ticket.reporter.lastName || ''}` } || '',
          assignee           : ticket && ticket?.assignee && { _id: ticket?.assignee?._id, name: `${ticket.assignee.firstName || ''} ${ticket.assignee.lastName || ''}` } || '',
          summary            : ticket && ticket?.summary || '',
          description        : ticket && ticket?.description || '',
          priority           : ticket && ticket?.priority?.name || '',
          priorityIcon       : ticket && ticket?.priority?.icon || '',
          priorityColor      : ticket && ticket?.priority?.color || '',
          status             : ticket && ticket?.status?.name || '',
          statusIcon         : ticket && ticket?.status?.icon || '',
          statusColor        : ticket && ticket?.status?.color || '',
          impact             : ticket && ticket?.impact?.name || '',
          files              : ticket && ticket?.files || [],
          changeType         : ticket && ticket?.changeType || '',
          changeReason       : ticket && ticket?.changeReason || '',
          implementationPlan : '',
          backoutPlan        : '',
          testPlan           : '',
          investigationReason: null,
          rootCause          : '',
          workaround         : '',
          shareWith          : false,
          isActive           : true,
          plannedStartDate   : new Date(),
          plannedEndDate     : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          startTime          : null,
          endTime            : null,
          hlc                : softwareVersion?.hlc || '',
          plc                : softwareVersion?.plc || '',
          createdAt          : ticket && fDate(ticket.createdAt) || '',
          updatedAt          : ticket && fDate(ticket?.updatedAt) || '',
          createdBy          : ticket && ticket?.createdBy?.name || '',
          updatedBy          : ticket && ticket?.updatedBy?.name || '',
          createdIP          : ticket && ticket?.createdIP || '',
          updatedIP          : ticket && ticket?.updatedIP || ''
       }
      }, [customer])
     }

