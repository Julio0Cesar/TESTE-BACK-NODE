import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
const swaggerDocument = YAML.load("./src/shared/docs/swagger.yaml")

export function setupSwagger(app: any) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
