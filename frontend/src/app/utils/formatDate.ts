export function formatDate(date: string) {
    const dateDT = new Date(date);
    const formattedDate = dateDT.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    return formattedDate
}