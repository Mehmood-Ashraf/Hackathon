export const validateForm = (formData, type) => {
    const errors = {};

    if(!formData.email?.trim()){
        errors.email = "Email is required"
    }else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            errors.email = "Invalid Email format"
        }
    }

    if(!formData.password.trim()){
        errors.password = "password is required!"
    }else if(formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    }

    if(type === "signup"){
        if(!formData.userName.trim()){
            errors.userName = "Username is required"
        }

        if(!formData.country.trim()){
            errors.country = "Country is required"
        }

        if(!formData.city.trim()){
            errors.city = "City is required"
        }
    }

    return errors
}