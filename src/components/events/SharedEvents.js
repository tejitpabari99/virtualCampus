
export function eventPropStylesShared(event, start, end, isSelected) {
    let style = {
        backgroundColor: "#2984CE"
    };
    let nowStyle = {
        backgroundColor: "#1BAE0E"
    }
    let pastStyle = {
        backgroundColor: "#BDBDBD"
    }
    let popularStyle = {
        backgroundColor: "#2984CE"
    }
    let recurringStyle = {
        backgroundColor: "#FB750D"
    }

    if (event.displayNow) {
        return {style: nowStyle};
    }
    else if (event.displayPast) {
        return {style: pastStyle};
    }
    else if (event.displayPopular) {
        return {style: popularStyle};
    }
    else if (event.displayRecurring) {
        return {style: recurringStyle};
    }
    else {
        return {style: style};
    }
}