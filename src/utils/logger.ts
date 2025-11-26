import chalk from 'chalk'

type LogColor = keyof typeof chalk

export function log(message: string, color: LogColor = 'white') {
  const colorFn = (chalk as any)[color]
  if (typeof colorFn === 'function') {
    console.log(colorFn(message))
  } else {
    console.log(chalk.white(message))
  }
}

export function logInfo(message: string) {
  log(message, 'cyan')
}

export function logSuccess(message: string) {
  log(message, 'green')
}

export function logWarn(message: string) {
  log(message, 'yellow')
}

export function logError(message: string) {
  log(message, 'red')
}

export function logServer(message: string) {
  console.log(chalk.bold.blue(message))
}
