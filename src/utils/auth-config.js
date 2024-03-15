/* eslint-disable no-undef */
import { LogLevel } from "@azure/msal-browser"


export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_MSAL_CLIENT, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: "https://login.microsoftonline.com/common",// Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: process.env.REACT_APP_MSAL_SECRET, // Client secret generated from the app registration in Azure portal
        redirectUri: "https://appointmate-three.vercel.app/appointments", // This is the redirect URI of the app registration in Azure portal
        postLogoutRedirectUri: "https://appointmate-three.vercel.app/",
        navigateToLoginRequestUrl: false
    },
    caches: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    },

    system: {
        loggerOptions: {
            loggerCallback: (loglevel, message) => {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}


export const loginRequest = {
    scopes: [
        "User.Read",
        "Calendars.ReadWrite",
        "Mail.Read",
        "Mail.Read.Shared",
        "Mail.ReadBasic",
        "Mail.ReadBasic.Shared",
        "Mail.ReadWrite",
        "Mail.ReadWrite.Shared",
        "Mail.Send",
        "Mail.Send.Shared",
        "MailboxSettings.Read",
        "MailboxSettings.ReadWrite"
    ]
};