import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;

        const userAddress = await Address.create({
            userId: req.user._id, // assuming req.user contains the logged-in user
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });

        res.json({ message: "Address added", userAddress , success:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getAddress = async (req,res)=> {
    let address = await Address.find({userId:req.user}).sort().sort({createdAt:-1})
    res.json({message:'address', userAddress:address[0]})
}