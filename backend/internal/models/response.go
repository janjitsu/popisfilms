package models

import "encoding/json"

type Response struct {
	Result any `json:"result"`
}

func NewResponse(result any) *Response {
	return &Response{result}
}

func NewErrorResponse(message string) *Response {
	return &Response{Result: map[string]string{"message": message}}
}

func (r *Response) ToJson() ([]byte, error) {
	return json.Marshal(r)
}

func (r *Response) ToString() (string, error) {
	jsonResponse, err := json.Marshal(r)
	if err != nil {
		return "", err
	}

	return string(jsonResponse), nil
}
