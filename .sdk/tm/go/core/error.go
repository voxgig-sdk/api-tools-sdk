package core

type ApiToolsError struct {
	IsApiToolsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewApiToolsError(code string, msg string, ctx *Context) *ApiToolsError {
	return &ApiToolsError{
		IsApiToolsError: true,
		Sdk:              "ApiTools",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ApiToolsError) Error() string {
	return e.Msg
}
