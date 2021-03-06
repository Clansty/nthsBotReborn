import {User} from '../types/user'
import {Role} from '../types/Role'
import {CURRENT_YEAR, GRADES} from '../maps/enrollments'

export const createUser = (id: number): User => ({
    id,
    enrollment: 0,
    junior: false,
    name: '',
    nick: '',
    role: Role.normal,
    branch: false,
})

export const getGradeByEnrollment = (enr: number) => {
    if (GRADES[enr]) return GRADES[enr]
    if (enr < 1970 || enr > CURRENT_YEAR) return '未知'
    return (enr + 3) + '届'
}

export const getPrefixByUser = (user: User) => {
    if (user.prefix) return user.prefix
    let prefix = ''
    if (user.role == Role.powerUser) prefix = 'A管理员'
    if (user.branch) prefix += '金阊'
    if (user.junior)
        prefix += (user.enrollment + 3) + '届初中'
    else
        prefix += getGradeByEnrollment(user.enrollment)

    return prefix
}

export const getProperNameCardByUser = (user: User) => getPrefixByUser(user) + ' | ' + user.nick
