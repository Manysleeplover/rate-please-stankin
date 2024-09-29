const enum LesionStyle {
    Lecture = "bg-blue-400 rounded-xl border-1 pl-1 pr-1",
    Seminar = "bg-yellow-400 rounded-xl border-1 pl-1 pr-1",
    Laboratory_Work = "bg-green-400 rounded-xl border-1 pl-1 pr-1"
}

const enum SubGroupStyle {
    А = "bg-orange-300 rounded-xl border-1 pl-1 pr-1",
    Б = "bg-indigo-300 rounded-xl border-1 pl-1 pr-1"
}

export function getLesionStyle(lessionType: string){
    switch(lessionType){
        case "Лекция": return LesionStyle.Lecture
        case "Семинар": return LesionStyle.Seminar
        case "Лабораторная работа": return LesionStyle.Laboratory_Work
    }
}

export function getSubGroupStyle(subGroup: string){
    switch(subGroup){
        case "А": return SubGroupStyle.А
        case "Б": return SubGroupStyle.А
    }
}

export function getFormattedDate(dateTime: Date){
    return dateTime.toLocaleTimeString().replace(/(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/, "$1")
}

