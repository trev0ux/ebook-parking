import { navigateTo } from '#app'

export function handleApiError(error, validationErrors, errorMessage) {
    if (!error) {
        errorMessage.value = "Netwerkfout of server is onbereikbaar. We hebben een onverwerkte fout gevonden. Probeer het opnieuw. Als het probleem zich blijft voordoen, neem dan contact op met onze helpdesk op +31 517 412 986.";
        console.error("Er is een fout opgetreden:", errorMessage.value);
        return navigateTo('/error');
    }

    const { response } = error;

    if (response) {
        const { status, data } = response;

        switch (status) {
            case 400:
                if (validationErrors && data.errors) {
                    Object.assign(validationErrors.value, data.errors);
                } else {
                    errorMessage.value = data.message || "Ongeldig verzoek.";
                }
                break;
            case 403:
                errorMessage.value = "Toegang verboden. U heeft geen toestemming om deze bron te bekijken.";
                navigateTo('/error');
                break;
            case 404:
                errorMessage.value = "Bron niet gevonden.";
                navigateTo('/error');
                break;
            case 422:
                errorMessage.value = data[""][0];
                break;
            case 500:
                errorMessage.value = "Interne serverfout. Probeer het later opnieuw.";
                navigateTo('/error');
                break;
            default:
                errorMessage.value = data.message || "Er is een onverwachte fout opgetreden. We hebben een onverwerkte fout gevonden. Probeer het opnieuw. Als het probleem zich blijft voordoen, neem dan contact op met onze helpdesk op +31 517 412 986.";
        }
    } else {
        errorMessage.value = "Er is een onverwachte fout opgetreden. We hebben een onverwerkte fout gevonden. Probeer het opnieuw. Als het probleem zich blijft voordoen, neem dan contact op met onze helpdesk op +31 517 412 986.";
    }
    console.log(response)

    console.error("Er is een fout opgetreden:", error);
}
