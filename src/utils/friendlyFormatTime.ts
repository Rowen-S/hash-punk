/**
 *
 * @param stringTime 毫秒时间戳
 * @returns string
 */
export default function friendlyFormatTime(stringTime: number): string {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = month * 12
  const time1 = new Date().getTime() //当前的时间戳
  const time2 = Date.parse(String(new Date(stringTime))) //指定时间的时间戳
  const time = time1 - time2
  let result = null
  if (time < 0) {
    result = '--'
  } else if (time / year >= 1) {
    result = parseInt(String(time / year)) + '年前'
  } else if (time / month >= 1) {
    result = parseInt(String(time / month)) + '月前'
  } else if (time / week >= 1) {
    result = parseInt(String(time / week)) + '周前'
  } else if (time / day >= 1) {
    result = parseInt(String(time / day)) + '天前'
  } else if (time / hour >= 1) {
    result = parseInt(String(time / hour)) + '小时前'
  } else if (time / minute >= 1) {
    result = parseInt(String(time / minute)) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

/**
 * S转天
 * @param {*} msd 秒数
 * @returns
 */
export function SecondToDate(msd: number) {
  const time = msd
  let reslt = ``
  if (time) {
    if (time > 60 && time < 60 * 60) {
      reslt = `${parseInt(String(time / 60.0)) > 0 ? parseInt(String(time / 60.0)) + ' MIN ' : ''}
      ${
        parseInt(String((parseFloat(String(time / 60.0)) - parseInt(String(time / 60.0))) * 60)) > 0
          ? parseInt(String((parseFloat(String(time / 60.0)) - parseInt(String(time / 60.0))) * 60)) + ' S '
          : ''
      }`
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      reslt = `${parseInt(String(time / 60.0)) > 0 ? parseInt(String(time / 60.0)) + ' hours ' : ''}
      ${
        parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) > 0
          ? parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) + ' mins '
          : ''
      }
      ${
        parseInt(
          String(
            parseFloat(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 3600.0))) * 60)) -
              parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 3600.0))) * 60)) * 60
          )
        ) > 0
          ? parseInt(
              String(
                (parseFloat(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 3600.0))) * 60)) -
                  parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 3600.0))) * 60))) *
                  60
              )
            ) + ' S '
          : ''
      }  
      `
    } else if (time >= 60 * 60 * 24) {
      reslt = `${parseInt(String(time / 3600.0 / 24)) > 0 ? parseInt(String(time / 3600.0 / 24)) + ' days ' : ''}
      ${
        parseInt(String((parseFloat(String(time / 3600.0 / 24)) - parseInt(String(time / 3600.0 / 24))) * 24))
          ? parseInt(String((parseFloat(String(time / 3600.0 / 24)) - parseInt(String(time / 3600.0 / 24))) * 24)) +
            ' hours '
          : ''
      }
      ${
        parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) > 0
          ? parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) + ' mins '
          : ''
      }
      ${
        parseInt(
          String(
            (parseFloat(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) -
              parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60))) *
              60
          )
        ) > 0
          ? parseInt(
              String(
                (parseFloat(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60)) -
                  parseInt(String((parseFloat(String(time / 3600.0)) - parseInt(String(time / 60.0))) * 60))) *
                  60
              )
            ) + ' S '
          : ''
      }  
      `
    } else {
      reslt = parseInt(String(time)) + ' S '
    }
  }
  return reslt
}
