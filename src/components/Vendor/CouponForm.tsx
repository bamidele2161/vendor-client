import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface Coupon {
  id?: string;
  code: string;
  type: string;
  value: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount?: number;
  status?: string;
  products: string[];
  description: string;
}

interface CouponFormProps {
  coupon?: Coupon | null;
  onSave: (coupon: Coupon) => void;
  onCancel: () => void;
}

const defaultCoupon: Coupon = {
  code: "",
  type: "percentage",
  value: 10,
  minPurchase: 0,
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .split("T")[0],
  usageLimit: 100,
  products: ["all"],
  description: "",
};

const CouponForm: React.FC<CouponFormProps> = ({
  coupon,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Coupon>(coupon || defaultCoupon);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    } else {
      setFormData(defaultCoupon);
    }
  }, [coupon]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle number inputs
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    }

    if (formData.value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }

    if (formData.type === "percentage" && formData.value > 100) {
      newErrors.value = "Percentage cannot exceed 100%";
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (formData.usageLimit <= 0) {
      newErrors.usageLimit = "Usage limit must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label className="mb-2 block" htmlFor="coupon-code">
            Coupon Code*
          </Label>
          <Input id="coupon-code"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            aria-invalid={Boolean(errors.code)}
            placeholder="e.g. SUMMER25"
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600">{errors.code}</p>
          )}
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="coupon-type">
            Discount Type*
          </Label>
          <select
            id="coupon-type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-[#151A22]/10 bg-white px-4 text-sm focus:border-[#6F8294] focus:outline-none focus:ring-4 focus:ring-[#6F8294]/10"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="coupon-value">
            Discount Value*
          </Label>
          <Input id="coupon-value"
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            aria-invalid={Boolean(errors.value)}
            min="0"
            max={formData.type === "percentage" ? "100" : undefined}
            step="0.01"
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value}</p>
          )}
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="min-purchase">
            Minimum Purchase Amount
          </Label>
          <Input id="min-purchase"
            type="number"
            name="minPurchase"
            value={formData.minPurchase}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="coupon-start">
            Start Date*
          </Label>
          <Input id="coupon-start"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="coupon-end">
            End Date*
          </Label>
          <Input id="coupon-end"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.endDate)}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>

        <div>
          <Label className="mb-2 block" htmlFor="usage-limit">
            Usage Limit*
          </Label>
          <Input id="usage-limit"
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            aria-invalid={Boolean(errors.usageLimit)}
            min="1"
          />
          {errors.usageLimit && (
            <p className="mt-1 text-sm text-red-600">{errors.usageLimit}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2 block" htmlFor="coupon-description">
            Description*
          </Label>
          <Textarea id="coupon-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            aria-invalid={Boolean(errors.description)}
            placeholder="Brief description of this coupon"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-[#151A22]/10 pt-5">
        <Button variant="outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          {coupon ? "Update Coupon" : "Create Coupon"}
        </Button>
      </div>
    </form>
  );
};

export default CouponForm;
