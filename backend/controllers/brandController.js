import BrandModel from "../models/BrandModel.js";
// createbrand
export const addBrand =async (req, res) => {
    try {
        const { brandname } = req.body; 
        const file = req.file;      
        console.log(file)
        console.log(brandname)
        if (!brandname ) {
            return res.status(400).json({ message: "All fields required" });
        }
        if (!file) {
            return res.status(400).json({
                message: "Choose an image file "
            });
        }
        const newBrand = await BrandModel.create({
            brandname,
            image: `http://localhost:5000/uploads/${file.filename}`
        });
        return res.status(200).json({
            message: "Brand added successfully",
           newBrand
        });

    } catch (error) {
        console.log(error);
       
        return res.status(500).json({ message: "Server error" });
    }
};
// getallbrand
export const getallBrands = async (req, res) => {
    try {
        const brands = await BrandModel.find()
  console.log('getting')
        return res.status(200).json({
            message: "Brands fetched successfully",
            brands
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
// update brand
export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { brandname } = req.body;
        const file = req.file;
        console.log(id)
        console.log(brandname)
        const existingBrand = await BrandModel.findById(id);
        if (!existingBrand) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }
        
        const updatedData = {
            brandname: brandname || existingBrand.brandname,
        };
        if (file) {
            updatedData.image = `http://localhost:5000/uploads/${file.filename}`;
        }

        const updatedBrand = await BrandModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        

        return res.status(200).json({
            message: "Brand updated successfully",
            brand: updatedBrand
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BrandModel.findOne({_id:id});
    if (!deleted) {
      return res.status(404).json({ message: "Brand not found" });
    }
    await BrandModel.findByIdAndDelete({_id:id})
    return res.status(200).json({
      message: "Brand deleted successfully",
      id
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server error" });
  }
};