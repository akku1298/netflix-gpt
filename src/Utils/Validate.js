export const Validate =(email,passowrd)=>{
    const isEmailValid=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid=/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/.test(passowrd);
    if(!isEmailValid) return "Email is not correct";
    //if(!isPasswordValid) return "Password is not correct";

    return null;
}