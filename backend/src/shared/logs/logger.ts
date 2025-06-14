import { createLogger, format, transports } from "winston"
import path from "path"

const logPath = path.join(__dirname, "..", "..", "..", "logs", "app.log")

export const logger = createLogger({
  level: "info",
  format: format.combine(
        format.timestamp({
            format: () => {
                const date = new Date()
                date.setHours(date.getHours() - 3)
                return date.toISOString().replace("T", " ").substring(0, 19)
            }
        }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logPath })
  ]
})
