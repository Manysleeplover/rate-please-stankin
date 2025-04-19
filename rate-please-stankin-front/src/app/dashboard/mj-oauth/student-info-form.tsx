import {ClipboardDocumentIcon, IdentificationIcon, UserIcon} from "@heroicons/react/16/solid";
import {AcademicCapIcon} from "@heroicons/react/24/outline";
import {StudentInfoDTO} from "@/app/lib/api/ui-interfaces";


export default function StudentProfile({ data }: { data: StudentInfoDTO }) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Можно добавить уведомление об успешном копировании
    };

    return (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Карточка профиля */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    {/* Шапка с токеном */}
                    <div className="bg-indigo-700 px-6 py-4 border-b border-indigo-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Данные авторизации</h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-indigo-100">
                {data.token_type}
              </span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <p className="text-sm text-indigo-200 truncate flex-1">
                                {data.access_token}
                            </p>
                            <button
                                onClick={() => copyToClipboard(data.access_token)}
                                className="ml-2 text-indigo-200 hover:text-white"
                                title="Копировать токен"
                            >
                                <ClipboardDocumentIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Основное содержимое */}
                    <div className="px-6 py-8">
                        {/* Заголовок */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                                <UserIcon className="h-8 w-8 text-indigo-700" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {data.userInfo.surname} {data.userInfo.name} {data.userInfo.patronym}
                                </h1>
                                <p className="text-gray-500">Студент</p>
                            </div>
                        </div>

                        {/* Детали профиля */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Блок с учебной информацией */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <AcademicCapIcon className="h-6 w-6 text-indigo-700 mr-2" />
                                    <h3 className="text-lg font-medium text-gray-900">Учебная информация</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Группа</p>
                                        <p className="text-gray-900 font-medium">{data.userInfo.stgroup}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">ID карты</p>
                                        <p className="text-gray-900 font-mono font-medium">{data.userInfo.cardid}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Блок с персональной информацией */}
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <IdentificationIcon className="h-6 w-6 text-indigo-700 mr-2" />
                                    <h3 className="text-lg font-medium text-gray-900">Персональные данные</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Фамилия</p>
                                        <p className="text-gray-900 font-medium">{data.userInfo.surname}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Имя</p>
                                        <p className="text-gray-900 font-medium">{data.userInfo.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Отчество</p>
                                        <p className="text-gray-900 font-medium">{data.userInfo.patronym}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Футер */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-end">
              <span className="text-sm text-gray-500">
                Данные обновлены: {new Date().toLocaleDateString()}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}