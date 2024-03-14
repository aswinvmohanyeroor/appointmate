import { LogLevel } from "@azure/msal-browser"

// auth: {
//     clientId: "04c07748-9487-4ab3-804f-a2a5172db6f3", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
//     authority: "https://login.microsoftonline.com/" + "f0132019-19b9-4aad-a382-6c04f1b4f18b", // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
//     clientSecret: "EXb8Q~bl.B2Kmat6tlwYgLo862TE8NVerj2kkdux", // Client secret generated from the app registration in Azure portal
//     redirectUri: "http://localhost:3000/appointments", // This is the redirect URI of the app registration in Azure portal
//     postLogoutRedirectUri: "http://localhost:3000/",
//     navigateToLoginRequestUrl: false
// },
export const msalConfig = {
    auth: {
        clientId: "ce4aeb81-d2c8-480e-967e-f69dffde55c3", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: "https://login.microsoftonline.com/common",// Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: "4mZ8Q~Jtn3Bu0oXo43V2TDWQzkfq3y78XeDsNbJx", // Client secret generated from the app registration in Azure portal
        redirectUri: "http://localhost:3000/appointments", // This is the redirect URI of the app registration in Azure portal
        postLogoutRedirectUri: "http://localhost:3000/",
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