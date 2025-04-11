const LessionCommonStyle = "rounded-xl border-1 pl-2 pr-2"


const enum LesionStyle {
    Lecture = `bg-blue-400 ${LessionCommonStyle}`,
    Seminar = `bg-yellow-400 ${LessionCommonStyle}`,
    Laboratory_Work = `bg-green-400 ${LessionCommonStyle}`
}

const enum SubGroupStyle {
    A = `bg-orange-300 ${LessionCommonStyle}`,
    B = `bg-indigo-300 ${LessionCommonStyle}`,
    C = `bg-gray-300 ${LessionCommonStyle}`
}

export function getLesionStyle(lessionType: string){
    switch(lessionType.toLowerCase()){
        case "лекции": return LesionStyle.Lecture
        case "семинар": return LesionStyle.Seminar
        case "лабораторные занятия": return LesionStyle.Laboratory_Work
    }
}

export function getSubGroupStyle(subGroup: string){
    switch(subGroup.toLowerCase()){
        case "(а)": return SubGroupStyle.A
        case "(б)": return SubGroupStyle.B
        case "без подгруппы": return SubGroupStyle.C
    }
}

export function getFormattedDate(dateTime: Date){
    return dateTime.toLocaleTimeString().replace(/(0[0-9]|2[0-9]|2[0-3]):([0-5][0-9])/, "$2")
}



